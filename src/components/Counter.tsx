import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { useState } from 'react';

import {
  increment,
  decrement,
  incrementByAmount,
} from '../store/slices/counterSlice';

export function Counter() {
  const [amount, setAmount] = useState(0);

  const count = useAppSelector((state) => state.counter.counterValue);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>計數器: {count}</h2>
      <button onClick={() => dispatch(increment())}>增加</button>
      <button onClick={() => dispatch(decrement())}>減少</button>
      <br />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={() => dispatch(incrementByAmount(amount))}>
        增加上述數字
      </button>
    </div>
  );
}
