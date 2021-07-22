import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const SideNav = () => {
  const history = useHistory();

  const handlePage = (page: string) => history.push(page);

  const logout = () => {
    localStorage.clear();
    handlePage("/login");
  };

  const links = [
    {
      name: "Início",
      action: () => handlePage("/home"),

      variant: "contained",
      color: "primary",
    },
    {
      name: "Veículos",
      action: () => handlePage("/vehicles"),

      variant: "outlined",
      color: "primary",
    },
    {
      name: "Marcas",
      action: () => handlePage("/brands"),

      variant: "outlined",
      color: "primary",
    },
    {
      name: "Usuários",
      action: () => {},

      variant: "outlined",
      color: "primary",
    },
    {
      name: "Dashboard",
      action: () => handlePage("/dashboard"),

      variant: "outlined",
      color: "primary",
    },
    {
      name: "Sair",
      action: () => logout(),

      variant: "contained",
      color: "secondary",
    },
  ];
  return (
    <>
      {links.map((link, index) => (
        // @ts-ignore: Unreachable code error
        <Button
          style={{ marginTop: 10 }}
          // @ts-ignore: Unreachable code error
          variant={link.variant}
          // @ts-ignore: Unreachable code error
          color={link.color}
          disableElevation
          key={index}
          onClick={link.action}
        >
          {link.name}
        </Button>
      ))}
    </>
  );
};

export default SideNav;
