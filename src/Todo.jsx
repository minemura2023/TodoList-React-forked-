import { useState } from "react";
import { InputTodo } from "./components/inputTodo";
import { InCompleteTodo } from "./components/IncompleteTodo";
import { CompleteTodo } from "./components/CompleteTodo";
import "./styles.css";

export const Todo = () => {
  //追加Todo要素
  const [todoText, setTodoText] = useState("");
  //未完了Todo要素
  const [incompleteTodo, setIncompleteTodo] = useState([]);
  //完了Todo要素
  const [completeTodo, setcompleteTodo] = useState([]);

  //テキストボックスonChangeイベント
  const onChangeText = (event) => setTodoText(event.target.value);
  //追加ボタンonClickイベント
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodo = [...incompleteTodo, todoText];
    setIncompleteTodo(newTodo);
    setTodoText("");
  };
  //削除ボタン(未完了Todo)onClickイベント
  const onClickDelete = (index) => {
    const newTodo = [...incompleteTodo];
    //index番目の要素から1つ削除
    newTodo.splice(index, 1);
    setIncompleteTodo(newTodo);
  };

  //完了ボタン(未完了Todo)onClickイベント
  const onClickComplete = (index) => {
    const newinCompTodo = [...incompleteTodo];
    //index番目の要素から1つ削除
    newinCompTodo.splice(index, 1);
    setIncompleteTodo(newinCompTodo);

    //完了Todoリストにindex番目の未完了Todoリスト要素を追加
    const newCompTodo = [...completeTodo, incompleteTodo[index]];
    setcompleteTodo(newCompTodo);
  };

  //戻すボタンonClickイベント
  const onClickBack = (index) => {
    //完了リストから未完了リストへ
    const newinCompTodo = [...incompleteTodo, completeTodo[index]];
    setIncompleteTodo(newinCompTodo);

    //完了リストのindex番目の要素を削除
    const newCompTodo = [...completeTodo];
    newCompTodo.splice(index, 1);
    setcompleteTodo(newCompTodo);
  };

  const isMaxCompleteTodo = incompleteTodo.length >= 5;

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeText}
        onClick={onClickAdd}
        disabled={isMaxCompleteTodo}
      />
      {isMaxCompleteTodo && (
        <p style={{ color: "red" }}>登録できるのは５個までです。</p>
      )}
      <InCompleteTodo
        todos={incompleteTodo}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodo todos={completeTodo} onClickBack={onClickBack} />
    </>
  );
};
