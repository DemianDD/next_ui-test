import React from 'react'
import { ICard } from '../modals/ICard'
import {Card, CardHeader, CardBody, Image, Divider } from "@nextui-org/react"

interface IProps{
    cards: ICard[];
}

const Item = (props: IProps) => {
  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3'>
        {props.cards.map((card) => {
            return(
                <Card className="p-4 bg-[#232323] max-w-[280px] text-white shadow-lg shadow-[#ccc]" key={card.id}>
                    <CardHeader className="p-4 flex-col items-center rounded-lg">
                        <p className="text-tiny uppercase font-bold">{card.name}</p>
                        <small className="text-default-500">{card.artist}</small>
                        <Divider orientation='horizontal' className='bg-[#6a6a6a] my-3 w-1/4'/>
                        <div className='text-xs text-justify text-[#8b8b8b] h-[100px] overflow-auto'>{card.text}</div>
                    </CardHeader>
                    <CardBody className="overflow-visible flex flex-col items-center p-0">
                        <Image
                            alt={card.name}
                            className="object-cover"
                            src={card.imageUrl}
                            width='100%'
                        />
                    </CardBody>
                </Card>
            )
        })}
    </div>
  )
}

export default Item;