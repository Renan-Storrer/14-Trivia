import React from "react";
import App from "../App";
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';

describe('Testa a página de login', () => { 
  test('Testa se aparece a página de login', () => {
    renderWithRouterAndRedux(<App />);
    const loginPage = screen.getByTestId('login-div');
    expect(loginPage).toBeInTheDocument();
  });

  test('Testa os inputs name e email e click no botão "Play!"', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name');
    userEvent.type(name, 'Grupo29')
    const email = screen.getByTestId('input-gravatar-email');
    userEvent.type(email, 'grupo29@test.com')
    const btn = screen.getByTestId('btn-play');
    expect(btn).toBeEnabled();
    userEvent.click(btn);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/game')
    });
  });

  test('Testa o click no botão "Settings"', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingsBtn = screen.getByTestId('btn-settings');
    userEvent.click(settingsBtn);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/settings')
    });
  });
})
