import {CartItem} from './index';
import {OnCheckedChange} from './use-checked';
import React from 'react';
import {Typography} from 'antd';

interface Props {
  item: CartItem,
  checked: boolean,
  onCheckedChange: OnCheckedChange<CartItem>
}

function areEqual(prevProps: Props, nextProps: Props) {
  return prevProps.checked === nextProps.checked;
}

const ItemCard = React.memo((props: Props) => {
  console.log('cart item rerender');
  const {item, checked, onCheckedChange} = props;
  const {name, price} = item;

  const onWrapCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {checked} = e.target;
    onCheckedChange(item, checked);
  };

  return (
    <div className="item-card">
      <div className="checkbox-wrap">
        <input
          type="checkbox"
          checked={checked}
          onChange={onWrapCheckedChange}
        />
      </div>
      <p className="item-info">
        {name}<Typography.Text mark>${price}</Typography.Text>
      </p>
    </div>
  );
}, areEqual); // 默认情况下 memo 就是进行浅拷贝比较，因此 这里的 areEqual 可以不写

export default ItemCard;
