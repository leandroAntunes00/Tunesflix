import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import MovieModal from './MovieModal';

describe('MovieModal extra tests', () => {
  it('mostra loading quando loading=true', () => {
    render(<MovieModal open={true} loading={true} onClose={() => {}} />);
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it('mostra erro quando error presente', () => {
    render(<MovieModal open={true} error={new Error('boom')} onClose={() => {}} />);
    expect(screen.getByText(/erro: boom/i)).toBeInTheDocument();
  });

  it('mostra detalhes quando details presente e permite fechar', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const details = {
      id: 1,
      title: 'Detalhe Teste',
      runtime: 123,
      overview: 'Uma visão geral',
      tagline: 'Slogan',
      genres: [{ id: 1, name: 'Ação' }],
      production_companies: [{ id: 2, name: 'Prod' }],
      vote_average: 7.5,
    };

    render(<MovieModal open={true} details={details} onClose={onClose} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Detalhe Teste')).toBeInTheDocument();
    expect(screen.getByText(/123 min/)).toBeInTheDocument();
    expect(screen.getByText(/Uma visão geral/)).toBeInTheDocument();
    expect(screen.getByText(/Slogan/)).toBeInTheDocument();

    // fechar via botão
    await user.click(screen.getByLabelText(/fechar/i));
    expect(onClose).toHaveBeenCalled();
  });

  it('clica no backdrop chama onClose', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<MovieModal open={true} onClose={onClose} />);
    const backdrop = document.querySelector('.tf-modal__backdrop');
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });
});
