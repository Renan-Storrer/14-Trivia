import React from 'react';
import { act, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';

const initialState = { player: {
  name: 'renan',
  assertions: 4,
  score: 200,
  gravatarEmail: 'renan@renan.com.br'
}};

describe('Testando página de feedback', () => {
  test('Testa rota para a página', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
        history.push('/feedback')
      })
    expect(history.location.pathname).toBe('/feedback');

  });
  test('Testa título da página', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
        history.push('/feedback')
      })
    const title = screen.getByRole('heading', { name: /feedback/i });
    expect(title).toBeInTheDocument();
  });
  test('Testa imagem de gravatar', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
        history.push('/feedback')
      })
    const imgGravatar = screen.getByTestId('header-profile-picture');
    expect(imgGravatar).toBeInTheDocument();
  });
  test('Testa botão Play Again', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
        history.push('/feedback')
      })
    const btnPlayAgain = screen.getByRole('button', { name: /play again/i });
    expect(btnPlayAgain).toBeInTheDocument();

    userEvent.click(btnPlayAgain);
    expect(history.location.pathname).toBe('/');
  });
  test('Testa botão Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
        history.push('/feedback')
      })
    const btnRanking = screen.getByRole('button', { name: /ranking/i });
    expect(btnRanking).toBeInTheDocument();

    userEvent.click(btnRanking);
    expect(history.location.pathname).toBe('/ranking');
  });
  test('Testa mensagem "Well Done!"', () => {
    renderWithRouterAndRedux(<App />, initialState , '/feedback');
    console.log('initial state é', initialState);
    const msgFeedback = screen.getByRole('heading', { name: /well done!/i });
    expect(msgFeedback).toBeInTheDocument();
  });
})
