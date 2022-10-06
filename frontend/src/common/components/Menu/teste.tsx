import { useRouter } from "next/router";
import React from "react";
import { IconSaida } from "./styled";
import { Logout as LogoutIcon} from '@mui/icons-material'


export default function handleLogout() {
  const router = useRouter();
  localStorage.clear();
  router.push("/");

  return(

<IconSaida >

<h3 >Sair</h3>
<div>
  <LogoutIcon sx={{ fontSize: 30, color: '#fff', marginTop: 2 }} />
</div>

</IconSaida>

  )

}