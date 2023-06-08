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
        if(cell == SYMBOL_X){
            return "red"
        } else
        if(cell == SYMBOL_O) {
            return "green"
        } else {
            return 
        }
    }

    const computeWinner = (cells: any) => {
        const lines = [
            [0,1,2],
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
        setCurrentStep(SYMBOL_X)
        setWinnerSequence(undefined)
        setCells([null,null,null,null,null,null,null,null,null])
    }


    return (
       <div className={cl.game}>
            <div className={cl.gameTitle}>
                Текущий ход - {currentStep}
            </div>
            <div className={cl.gameField}>
                {cells.map((cell, index) => {
                    const isWinner = winnerSequence?.includes(index)
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
            <div className={cl.bg}>
                <div className={cl.endGame}>
                    <h2 className={cl.endTitle}>
                        В игре победили <span style={{color: getColor(currentStep === SYMBOL_X ? SYMBOL_O : SYMBOL_X)}}>{currentStep === SYMBOL_X ? SYMBOL_O : SYMBOL_X}</span>
                    </h2>
                    <button onClick={playAgain} className={cl.clear}>
                        Играть ещё
                    </button>
                </div>
            </div>
            }
       </div>
    )
}

export default Table
