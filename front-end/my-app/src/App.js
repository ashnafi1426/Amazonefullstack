import React from 'react';
import Header from "./components/Header/Header";
import CarouselEffect from "./components/Carousel/CarouselEffect";
import Category from "./components/Category/Category";
import Product from './components/Product/Product';
function App() {
  return (
    <div className="App">
      <Header />
      <CarouselEffect />
      <Category/>
      <Product/>
    </div>
  );
}
export default App;

