import { Grid, Paper, Typography } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { BrandsContext } from "../../context/BrandsContext";
import { VehiclesContext } from "../../context/VehiclesContext";
import { ISummary } from "../../interfaces/SummaryInterface";
import TinyBarChart from "../TinyBarChart";

const VehiclesSummary = () => {
  const { vehicles } = useContext(VehiclesContext);
  const { brands } = useContext(BrandsContext);
  const [summaries, setSummaries] = useState<ISummary[]>();

  const getTotalValue = (summary: ISummary) => {
    return summary.vehicles.reduce((accumulator, vehicle) => accumulator + vehicle.value, 0);
  };

  useEffect(() => {
    const generateSummary = () => {
      const summariesWithVehiclesAdded: ISummary[] = brands.map((brand) => ({
        ...brand,
        vehicles: [],
      }));

      for (let i = 0; i < vehicles.length; i++) {
        const brandId = vehicles[i].brandId;
        summariesWithVehiclesAdded
          .find((summary) => summary.id === brandId)
          ?.vehicles.push(vehicles[i]);
      }
      const summariesFilteredByVehiclesLength = summariesWithVehiclesAdded.filter(
        (summary) => summary.vehicles.length !== 0
      );
      setSummaries(summariesFilteredByVehiclesLength);
    };
    generateSummary();
  }, [vehicles, brands]);

  const valueFormatter = (number: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(+number);

  console.log(summaries);

  return (
    <>
      <TinyBarChart summaries={summaries} getTotalValue={getTotalValue} />
      <Grid container spacing={4} style={{ marginTop: 20, borderTop: "1px solid #8884D8" }}>
        {summaries &&
          summaries.map((summary) => (
            <Grid key={summary.id} item xs={6} container>
              <Paper style={{ minWidth: 300, paddingLeft: 10 }}>
                <Typography color="primary" variant="h5">
                  {summary.name}
                </Typography>
                <p>
                  Veículos: <b>{summary.vehicles.length}</b>
                </p>
                <p>
                  Valor total de veículos: <b>{valueFormatter(getTotalValue(summary))}</b>
                </p>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </>
  );
};
export default VehiclesSummary;
