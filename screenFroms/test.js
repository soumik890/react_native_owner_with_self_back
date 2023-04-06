import {Add, Close, Done, Edit, MoreHoriz} from '@mui/icons-material';
import {Divider, TextField} from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import DraggableList from 'react-draggable-list';
import MMLoader from '../../../utility/loader/mm-loader';
import NoDataComponent from '../../../utility/no-data-component/no-data-component';
import {
  createMenuItem,
  getMenuDetails,
  rearrangeMenuItem,
  updateCategory,
  updateMenuItem,
} from '../actions';
import MenuItemComponent from '../menu-item/menu-item';
import MenuItemEditComponent from '../menu-item/menu-item-edit';
//import Draggable from 'react-draggable';

const CategoryItem = props => {
  const {data, refreshCategoryDetails, details} = props;
  const [catTitle, setCatTitle] = useState(data?.cat);
  const [isCatEditing, setIsCatEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [menuItemList, setMenuItemList] = useState([]);
  const [isMenuItemCreating, setIsMenuItemCreating] = useState(false);
  const dragListRef = useRef();

  useEffect(() => {
    refreshMenuDetails();
  }, []);

  const refreshMenuDetails = () => {
    setIsLoading(true);
    const menuItemParams = {
      brand_id: data?.brand_id,
      menutype_id: data?.menutype_id,
      restaurant_id: data?.restaurant_id,
      category_id: data?.category_id,
    };
    getMenuDetails(menuItemParams)
      .then(resp => {
        console.log(resp.data, 'data menuItemList');
        setMenuItemList(resp?.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  console.log(menuItemList, 'menuItemList');

  const handleMenuItemCreation = async submitParams => {
    setIsLoading(true);
    createMenuItem(submitParams)
      .then(() => {
        setIsMenuItemCreating(false);
        refreshMenuDetails();
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleMenuListReorder = (newList, movedItem, oldIndex, newIndex) => {
    {
      console.log(newList, 'newList drag');
    }
    setMenuItemList(
      newList?.map((item, index) => {
        item.rank_order = index;
        return item;
      }),
    );

    const newItem = Object.assign({}, movedItem, {rank_order: newIndex + 1});
    setIsLoading(true);
    const paramsList = [
      'menu',
      'spice',
      'price',
      'veg',
      'description',
      'ingredients',
      'menu_id',
      'menu_image',
      'rank_order',
    ];
    Object.keys(newItem)?.map(key =>
      !paramsList.includes(key) ? delete newItem[key] : null,
    );
    rearrangeMenuItem(newItem)
      .then(() => {
        refreshMenuDetails();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="category-item ms-2">
      {isLoading ? <MMLoader className="overlay" /> : <></>}

      {isMenuItemCreating ? (
        <MenuItemEditComponent
          data={data}
          cancelCreation={() => setIsMenuItemCreating(false)}
          submitForm={handleMenuItemCreation}
          details={details}
        />
      ) : (
        <></>
      )}
      {menuItemList?.length > 0 ? (
        <>
          {/* {
                        menuItemList?.map((menuItem) => {
                            return <MenuItemEditComponent data={menuItem} />
                        })
                    } */}
          <div className="drag-list-container mt-3" ref={dragListRef}>
            <DraggableList
              itemKey="menu_id"
              container={() => dragListRef?.current || document.body}
              list={menuItemList?.sort((a, b) => a?.rank_order - b?.rank_order)}
              // list={menuItemList}
              onMoveEnd={(newList, movedItem, oldIndex, newIndex) =>
                handleMenuListReorder(newList, movedItem, oldIndex, newIndex)
              }
              touch={{
                passive: false,
              }}
              template={templateProps => (
                <MenuItemComponent
                  refreshMenuDetails={refreshMenuDetails}
                  {...templateProps}
                  details={details}
                />
              )}
            />
            <Divider>
              <MoreHoriz />
            </Divider>
          </div>
        </>
      ) : (
        <NoDataComponent imgClassName="mt-3" />
      )}
    </div>
  );
};

export default CategoryItem;
