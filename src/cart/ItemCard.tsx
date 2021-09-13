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
}, areEqual); // 默认情况下 memo 进行浅拷贝比较，对于引用类型，首先会比较地址，然后再比较其中的属性，因此这里的 areEqual 不可以省略

export default ItemCard;
