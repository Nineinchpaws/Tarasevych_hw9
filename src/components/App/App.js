import './App.css';
import { BrowserRouter, NavLink, Outlet, Route, Routes, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const productIds = [1,2,3,4,5];

  return (
    <ul>
      <li>
        <NavLink to={"/"}>
          Main
        </NavLink>
      </li>
      <li>
        <NavLink to={"/contacts"}>
          Contacts
        </NavLink>
      </li>
      <li>
        <NavLink to={"/catalog"}>
          Catalog
        </NavLink>
      </li>

      {productIds.map(productId => {
        return (
          <li key={productId}>
            <NavLink to={`/catalog/${productId}`}>
              product = {productId}
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}

const Main = () => {
  const [isOver18, setIsOver18] = useState(false);
  const navigate = useNavigate();

  const handleConfirmAge = () => {
    setIsOver18(true);
    navigate('/private');
  }

  return (
    <div>
      <h2>Main Page</h2>
      <p>Are you over 18?</p>
      <button onClick={handleConfirmAge}>Yes</button>
      {isOver18 && <Outlet />}
    </div>
  )
}

const ContactsPage = () => {
  return (
    <div>
      <h2>Contacts Page</h2>
      <p>Adress: Kyiv, Tarasa Shevchenko, 5</p>
      <p>Phone: +380 (95) 777 66 55</p>
      <p>Instagram: @react</p>
    </div>
  )
}

const CatalogPage = () => {
  return (
    <div>
      <h2>Catalog Page</h2>
      <Outlet />
    </div>
  )
}

const ProductItem = () => {
  const { productId } = useParams();

  return (
    <div>
      <h2>Product Item {productId}</h2>
    </div>
  )
}

const PrivatePage = () => {
  return (
    <div>
      <h2>Private Page</h2>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <h2>Shop</h2>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/catalog' element={<CatalogPage />}>
            <Route path='/catalog/:productId' element={<ProductItem />} />
          </Route>
          <Route path='/contacts' element={<ContactsPage />} />
          <Route path='/private' element={<PrivatePage />} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;


// Завдання 3
// Створіть приватний Rout, в який можна буде зайти, якщо користувач натиснув на кнопку «Мені більш як 18 років»
// style={({ isAdult })} =>
// isAdult ? adultStyle : undefined