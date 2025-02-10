import React from 'react'

function Header() {
  return (
  <>
   <header className="bg-dark py-5" style={{marginBottom: "20px", marginLeft: "-15%", marginRight:"-13%"}}>
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">Shop For Home <i class="fa-solid fa-shop"></i></h1>
                    <p className="lead fw-normal text-white-50 mb-0">Trusted Shopping Website</p>
                </div>
            </div>
        </header>
  </>
  )
}

export default Header