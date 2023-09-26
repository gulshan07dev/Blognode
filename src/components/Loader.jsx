import React from 'react'
import {  InfinitySpin } from 'react-loader-spinner'

export default function Loader() {
  return (
    <section className="h-screen w-screen flex justify-center items-center">
      <InfinitySpin width="200" color="#4fa94d" />
    </section>
  );
}
