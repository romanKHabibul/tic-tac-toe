"use client"

import React, { useState } from 'react'
import cl from './Table.module.scss'

const Table = () => {

    const SYMBOL_X = "x"
    const SYMBOL_O = "o"
    const [currentStep, setCurrentStep] = useState(SYMBOL_X)
    const [winnerSequence, setWinnerSequence] = useState<number[]>()
    const [cells, setCells] = useState([null,null,null,null,null,null,null,null,null])
    
    const getColor = (cell: any) => {
        if(cell === SYMBOL_X){
            return "red"
        } else {
            return "green"
        }
    }

    const computeWinner = (cells: any) => {
        const lines = [
            [1,2,3],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for(let i = 0; i < lines.length; i++){
            const [a,b,c] = lines[i]
            if(
                cells[a] &&
                cells[a] === cells[b] &&
                cells[a] === cells[c]
            ){
                return [a,b,c]
            } 
        }
    }

    const handleClick = (index: number) => {
        if(cells[index]){
            return;
        }
        if(winnerSequence){
            return;
        }
        const cellsCopy = cells.slice()
        //@ts-ignore
        cellsCopy[index] = currentStep

        const winner = computeWinner(cellsCopy)

        setCells(cellsCopy)
        setCurrentStep(currentStep === SYMBOL_O ? SYMBOL_X : SYMBOL_O)
        setWinnerSequence(winner)
    }

    const playAgain = () => {
        setWinnerSequence(undefined)
        setCells([null,null,null,null,null,null,null,null,null])
    }

    console.log(cells)

    return (
       <div className={cl.game}>
            <div className={cl.gameTitle}>
                Текущий ход - {currentStep}
            </div>
            <div className={cl.gameField}>
                {cells.map((cell, index) => {
                    const isWinner = winnerSequence?.includes(index)
                    console.log(isWinner)
                    return <button 
                            onClick={() => handleClick(index)} 
                            className={isWinner ? cl.cell + ' ' + cl.cellWin : cl.cell}
                            key={index}
                            >
                        <span style={{color: getColor(cell)}}>
                            {cell}
                        </span>
                    </button>
                })}
            </div>
            {winnerSequence &&
            <button onClick={playAgain} className={cl.clear}>
                Играть ещё
            </button>
            }
       </div>
    )
}

export default Table
