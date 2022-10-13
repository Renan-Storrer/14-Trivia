import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Ranking from '../pages/Ranking';
import App from '../App';
import userEvent from '@testing-library/user-event';

const initialState = { player: {
  name: 'Renan',
  assertions: 4,
  score: 200,
  gravatarEmail: 'renan@renan.com.br'
}};

describe('Testando página de ranking', () => {
  test('Testa botão início', () => {
    const { history } = renderWithRouterAndRedux(<Ranking />);
    const btnInicio = screen.getByRole('button', { name: /início/i });
    expect(btnInicio).toBeInTheDocument;

    userEvent.click(btnInicio);

    expect(history.location.pathname).toBe('/');
  });
});