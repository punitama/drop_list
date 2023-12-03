import { useState } from 'react';
import './App.css';

// 各リストアイテムに一意のIDを割り当てる

// リストを作成する配列
const listItems = [
  { id: '1', label: 'リスト１' },
  { id: '2', label: 'リスト２' },
  { id: '3', label: 'リスト３' }
];

const App = () => {
  const [items, setItems] = useState(listItems);
  const [dragItemId, setDragItemId] = useState(null);

  // ドラッグ開始時に呼び出し、ドラッグ項目をstateに保存
  const handleDragStart = (itemId) => {
    setDragItemId(itemId);
  };

  // 重なった時に配列を更新
  const handleDragOver = (event, targetItemId) => {
    // イベントのデフォルトの動作をキャンセル
    event.preventDefault();
    if (dragItemId === targetItemId) {
      return;
    }
  
    // ドラッグされたアイテムのインデックスを見つける
    const dragItemIndex = items.findIndex(item => item.id === dragItemId);
    // ドロップされる位置のアイテムのインデックスを見つける
    const targetItemIndex = items.findIndex(item => item.id === targetItemId);
  
    const newItems = Array.from(items);
    // ドラッグされたアイテムを一時的に削除
    const [draggedItem] = newItems.splice(dragItemIndex, 1);
    // ドラッグされたアイテムを新しい位置に挿入
    newItems.splice(targetItemIndex, 0, draggedItem);
  
    setItems(newItems);
  };

  return (
    <ul style={{ listStyle: "none" }}>
      {items.map((item) => (
        <li key={item.id} onDragOver={(event) => handleDragOver(event, item.id)}>
          <span
            style={{ cursor: 'grab', marginRight: '10px' }}
            draggable
            onDragStart={() => handleDragStart(item.id)}
          >
            ☰
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default App;