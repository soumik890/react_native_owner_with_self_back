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
  const [brandCounter, setBrandCounter] = useState(null);
  const [restCounter, setRestCounter] = useState(null);
  const [countController, setCountroller] = useState(false);
  const [menuCounter, setMenuCounter] = useState(0);
  const [menuTypeCounter, setMenuTypeCounter] = useState(0);
  const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);
  const [plan, setPlan] = useState(1);

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
        brandCounter,
        setBrandCounter,
        restCounter,
        setRestCounter,
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
      }}>
      {children}
    </exportvalues.Provider>
  );
};

export default ContextTab;
