import { createSlice } from '@reduxjs/toolkit'


const initialState = [
    {
      category : 'hobby',
      text : '🎳 취미'
    },
    {
      category : 'restaurant',
      text : '🍴 맛집'
    },
    {
      category : 'cafe',
      text : '☕ 카페'
    },
    {
      category : 'sports',
      text : '🛹 스포츠/레저'
    },
    {
      category : 'study',
      text : '📕 공부'
    },
    {
      category : 'shopping',
      text : '🛍 쇼핑'
    },
    {
      category : 'meeting',
      text : '👨‍👩‍👧‍👦 소모임'
    },
    {
      category : 'etc',
      text : '🙌🏻 기타'
    },
    {
      category : 'all',
      text : '전체'
    },
]

const category = createSlice({
    name : "category",
    initialState,
});

export default category;