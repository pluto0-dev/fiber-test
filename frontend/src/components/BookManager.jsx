// src/components/BookManager.js
import React, { useEffect, useState } from 'react';
import { getBooks,createBook,updateBook,deleteBook, } from '../service/booksevices';
import './BookManager.css'
export default function BookManager() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const res = await getBooks();
    setBooks(res.data);
  };

  const handleSubmit = async () => {
    if (editingId) {
      await updateBook(editingId, form);
    } else {
      await createBook(form);
    }
    setForm({ title: '', author: '' });
    setEditingId(null);
    loadBooks();
  };

  const handleEdit = (book) => {
    setForm({ title: book.title, author: book.author });
    setEditingId(book.id);
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    loadBooks();
  };

  return (
    <div className="container">
      <h2>📚 Book Manager</h2>

      <div className="form">
        <input
          type="text"
          placeholder="ชื่อหนังสือ"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="ผู้แต่ง"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <button onClick={handleSubmit}>
          {editingId ? 'อัปเดต' : 'เพิ่ม'}
        </button>
      </div>

      <ul className="book-list">
        {books.map((b) => (
          <li key={b.id}>
            <div>
              <strong>{b.title}</strong> <span>by {b.author}</span>
            </div>
            <div>
              <button onClick={() => handleEdit(b)}>แก้ไข</button>
              <button onClick={() => handleDelete(b.id)} className="danger">
                ลบ
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
