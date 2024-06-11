import { Droppable } from "react-beautiful-dnd";
import DragableCard from "./DragableCard";
import React, { useRef } from "react";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { ITodo } from "../atoms";

interface IAreaProps{
    isDraggingOver:boolean;
    isDraggingFromThis:boolean;
}

const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver? "blue" : props.isDraggingFromThis? "red" : "dimgray"};
    flex-grow: 1;
    transition: background-color .3s ease-in-out;
    padding: 10px;
    border-radius: 5px;
`
const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    span{
        font-size: 15px;
        font-weight: bold;
    }
`
const Wrapper = styled.div`
    width: 250px;
    background-color: ${props => props.theme.boardColor};
    padding: 10px 5px;
    border-radius: 5px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
`
const Form = styled.form`
    input{
        width: 100%;
    }
`
interface IBoardProps{
    toDos: ITodo[];
    boardId: string;
}
interface IForm{
    toDo:string
}
function Board({toDos,boardId}:IBoardProps){
    const {register,handleSubmit,setValue} = useForm();
    const onValid = ({toDo}:IForm) => {
        setValue("toDo","");
    };
    return(
        <Wrapper>
            <Title><span>{boardId}</span></Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register("toDo",{required:true})} type="text" placeholder={`Add task on ${boardId}`}/>
            </Form>
            <Droppable droppableId={boardId}>
                {(magic,snapshot) => 
                <Area 
                    ref={magic.innerRef} 
                    {...magic.droppableProps} 
                    isDraggingOver={snapshot.isDraggingOver}
                    isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                >
                    {toDos.map((todo, index) => 
                    <DragableCard key={todo.id} index={index} toDoId={todo.id} toDoText={todo.text}/>
                    )}
                    {magic.placeholder}
                </Area>
                }
            </Droppable>
        </Wrapper>
    )
}

export default React.memo(Board);