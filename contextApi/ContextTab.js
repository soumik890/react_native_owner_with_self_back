import React, {createContext, useState} from 'react';

export const exportvalues = createContext();

const ContextTab = ({children}) => {
  const [UserID, setUserID] = useState('');
  const [Search, setSearch] = useState(null);
  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [PhotoUrl, setPhotoUrl] = useState('');
  const [Brands, setBrands] = useState([]);
  const [Rests, setRests] = useState([]);
  const [Brand, setBrand] = useState([]);
  const [Rest, setRest] = useState([]);
  const [MenuType, setMenuType] = useState([]);
  const [Cat, setCat] = useState();
  const [actionB, setactionB] = useState(false);
  const [actionR, setactionR] = useState(false);
  const [actionMT, setactionMT] = useState(false);
  const [actionM, setactionM] = useState(false);
  const [countController, setCountroller] = useState(false);
  const [menuCounter, setMenuCounter] = useState(0);
  const [menuTypeCounter, setMenuTypeCounter] = useState(0);
  const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);
  const [AllMenuType, setAllMenuType] = useState([]);
  const [plan, setPlan] = useState({plan_id: 1});
  const [DispMenu, setDispMenu] = useState([]);

  return (
    <exportvalues.Provider
      value={{
        UserID,
        setUserID,
        Search,
        setSearch,
        Email,
        setEmail,
        Name,
        setName,
        PhotoUrl,
        setPhotoUrl,
        Brands,
        setBrands,
        Rests,
        setRests,
        Brand,
        setBrand,
        Rest,
        setRest,
        MenuType,
        setMenuType,
        Cat,
        setCat,
        actionB,
        setactionB,
        actionR,
        setactionR,
        actionMT,
        setactionMT,
        actionM,
        setactionM,
        countController,
        setCountroller,
        menuCounter,
        setMenuCounter,
        menuTypeCounter,
        setMenuTypeCounter,
        menuModalIsOpen,
        setMenuModalIsOpen,
        plan,
        setPlan,
        AllMenuType,
        setAllMenuType,
        DispMenu,
        setDispMenu,
      }}>
      {children}
    </exportvalues.Provider>
  );
};

export default ContextTab;
