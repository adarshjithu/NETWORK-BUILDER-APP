import React from 'react'
import Header from './Header'

function MainLayout({children}:any) {
  return (
    <div>
        <Header/>
        {children}
      
    </div>
  )
}

export default MainLayout
