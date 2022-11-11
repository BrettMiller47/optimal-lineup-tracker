import React from 'react';
import SeasonSummary from '../components/SeasonSummary'
import WeeklySummary from '../components/WeeklySummary/index';

export default function Home() {
  
  return (
    <>
      <SeasonSummary />
      <WeeklySummary />
    </>
  );
}