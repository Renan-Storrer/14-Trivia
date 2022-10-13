import React from "react";
import App from "../App";
import Feedback from "../pages/Feedback";
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';

describe('Testa a página de feedback', () => { 
  test('Testa a tela de feedback', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const playAgainBtn = screen.getByRole('button', {  name: /play again/i});
    const rankingBtn = screen.getByRole('button', {  name: /ranking/i});
    expect(playAgainBtn).toBeInTheDocument();
    expect(rankingBtn).toBeInTheDocument();
    userEvent.click(rankingBtn);
    console.log(history.location.pathname);
    expect(history.location.pathname).toBe('/ranking');
    const email = 
  });
});