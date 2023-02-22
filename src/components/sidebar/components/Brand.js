import React from "react";

// Chakra imports
import { Flex } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";
import api from "../../../api/axios";

export function SidebarBrand() {
  //   Chakra color mode
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("/companies/token");
      setData(result.data);
    }
    fetchData();
  }, []);

  return (
    <Flex align='center' direction='column'>
        {data.logo ? <img src={data.logo} alt="Logo" border="0" width="175px" height="26px"  /> : <text style={{color: "#000", fontSize: "30px", marginTop: "10px"}}>SEU LOGO AQUI</text> }
       
      <HSeparator mb='20px'  my='32px' />
    </Flex>
  );
}

export default SidebarBrand;
