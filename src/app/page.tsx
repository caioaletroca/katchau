"use client";

import BottomNavigation from "@/components/BottomNavigation";
import IconButton from "@mui/material/IconButton";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <div>
        <p>Logo</p>
        <IconButton>
          <span className="material-symbols-outlined">
            favorite
          </span>
        </IconButton>
      </div>
			<div className='flex flex-1' />
			<BottomNavigation />
    </div>
  )
}
