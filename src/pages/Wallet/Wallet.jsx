import React, { useState } from "react";
import { CreditCard } from "src/components/CreditCard/CreditCard";
import { Navbar } from "src/components/Navbar/Navbar";
import MockWallet from 'src/mocks/wallet';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import "./wallet.scss";
import 'swiper/css';
import 'swiper/css/effect-cards';

export const Wallet = () => {
  const [wallet] = useState(MockWallet);

  return (
    <div className="wallet">
      <h2>Wallet</h2>
      
      <Swiper modules={[EffectCards]} effect="cards">
        {
          wallet.map(card => {
            return (
              <SwiperSlide key={card.id}>
                <CreditCard card={card}/>
              </SwiperSlide>
            )
          })
        }
      </Swiper>

      <Navbar />
    </div>
  );
};
