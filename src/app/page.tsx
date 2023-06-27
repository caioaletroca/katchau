"use client";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

export default function Home() {
  return (
    <>
      <div>
        <p>Logo</p>
        <IconButton>
          <span className="material-symbols-outlined">
            favorite
          </span>
        </IconButton>
      </div>
      <Button variant='contained'>Log in</Button>
      <BottomNavigation>
        <BottomNavigationAction icon={
          <span className="material-symbols-outlined">
            home
          </span>
        } />
        <BottomNavigationAction icon={
          <span className="material-symbols-outlined">
            settings
          </span>
        } />
      </BottomNavigation>
    </>
  )
}
