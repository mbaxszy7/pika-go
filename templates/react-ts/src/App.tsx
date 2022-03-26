import { hot } from "react-hot-loader/root"
import React, { FC } from "react"
import Header from "@/Header"

const App: FC = () => {
  return (
    <>
      <Header />
      <main className=" bg-red-900">App hello react</main>
    </>
  )
}

export default hot(App)
