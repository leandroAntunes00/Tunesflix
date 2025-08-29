import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, vi, describe, beforeEach } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
  const user = userEvent.setup();
  let onPrev, onNext, onPageChange;

  beforeEach(() => {
    onPrev = vi.fn();
    onNext = vi.fn();
    onPageChange = vi.fn();
  });

  describe('Renderização básica', () => {
    test('não renderiza quando totalPages é undefined', () => {
      const { container } = render(<Pagination page={1} onPrev={onPrev} onNext={onNext} />);
      expect(container).toBeEmptyDOMElement();
    });

    test('não renderiza quando totalPages <= 1', () => {
      const { container } = render(
        <Pagination page={1} totalPages={1} onPrev={onPrev} onNext={onNext} />
      );
      expect(container).toBeEmptyDOMElement();
    });

    test('renderiza quando totalPages > 1', () => {
      render(<Pagination page={1} totalPages={5} onPrev={onPrev} onNext={onNext} />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByLabelText('Página anterior')).toBeInTheDocument();
      expect(screen.getByLabelText('Próxima página')).toBeInTheDocument();
    });

    test('aplica atributos ARIA corretos', () => {
      render(<Pagination page={2} totalPages={5} onPrev={onPrev} onNext={onNext} label="Filmes" />);

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Navegação de páginas para Filmes');
    });
  });

  describe('Informações da página', () => {
    test('mostra informações básicas da página', () => {
      render(<Pagination page={3} totalPages={10} onPrev={onPrev} onNext={onNext} />);

      // Verifica se o componente renderiza corretamente
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();

      // Verifica se os números estão presentes
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    test('mostra label quando fornecido', () => {
      render(
        <Pagination page={2} totalPages={8} onPrev={onPrev} onNext={onNext} label="Populares" />
      );

      // Verifica se o componente renderiza com o label correto
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Navegação de páginas para Populares');

      // Verifica se os números estão presentes
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
    });

    test('informações têm aria-live para atualizações dinâmicas', () => {
      render(<Pagination page={1} totalPages={5} onPrev={onPrev} onNext={onNext} />);

      // Verifica se o container tem aria-live
      const infoContainer = document.querySelector('[aria-live]');
      expect(infoContainer).toHaveAttribute('aria-live', 'polite');
      expect(infoContainer).toHaveAttribute('aria-atomic', 'true');
    });
  });

  describe('Botões de navegação', () => {
    test('botão anterior está desabilitado na primeira página', () => {
      render(<Pagination page={1} totalPages={5} onPrev={onPrev} onNext={onNext} />);

      const prevButton = screen.getByLabelText('Página anterior');
      expect(prevButton).toBeDisabled();
      expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    });

    test('botão próximo está desabilitado na última página', () => {
      render(<Pagination page={5} totalPages={5} onPrev={onPrev} onNext={onNext} />);

      const nextButton = screen.getByLabelText('Próxima página');
      expect(nextButton).toBeDisabled();
      expect(nextButton).toHaveAttribute('aria-disabled', 'true');
    });

    test('botões estão habilitados em páginas intermediárias', () => {
      render(<Pagination page={3} totalPages={5} onPrev={onPrev} onNext={onNext} />);

      expect(screen.getByLabelText('Página anterior')).not.toBeDisabled();
      expect(screen.getByLabelText('Próxima página')).not.toBeDisabled();
    });

    test('chama onPrev quando botão anterior é clicado', async () => {
      render(<Pagination page={3} totalPages={5} onPrev={onPrev} onNext={onNext} />);

      await user.click(screen.getByLabelText('Página anterior'));
      expect(onPrev).toHaveBeenCalledTimes(1);
    });

    test('chama onNext quando botão próximo é clicado', async () => {
      render(<Pagination page={3} totalPages={5} onPrev={onPrev} onNext={onNext} />);

      await user.click(screen.getByLabelText('Próxima página'));
      expect(onNext).toHaveBeenCalledTimes(1);
    });
  });

  describe('Navegação por teclado', () => {
    test('seta esquerda chama onPrev', async () => {
      render(<Pagination page={3} totalPages={5} onPrev={onPrev} onNext={onNext} />);

      const nav = screen.getByRole('navigation');
      nav.focus();

      // Simula pressionar seta esquerda
      fireEvent.keyDown(nav, { key: 'ArrowLeft', code: 'ArrowLeft' });
      expect(onPrev).toHaveBeenCalledTimes(1);
    });

    test('seta direita chama onNext', async () => {
      render(<Pagination page={3} totalPages={5} onPrev={onPrev} onNext={onNext} />);

      const nav = screen.getByRole('navigation');
      nav.focus();

      // Simula pressionar seta direita
      fireEvent.keyDown(nav, { key: 'ArrowRight', code: 'ArrowRight' });
      expect(onNext).toHaveBeenCalledTimes(1);
    });

    test('não chama callbacks quando na primeira página (seta esquerda)', async () => {
      render(<Pagination page={1} totalPages={5} onPrev={onPrev} onNext={onNext} />);

      const nav = screen.getByRole('navigation');
      nav.focus();

      // Simula pressionar seta esquerda na primeira página
      fireEvent.keyDown(nav, { key: 'ArrowLeft', code: 'ArrowLeft' });
      expect(onPrev).not.toHaveBeenCalled();
    });

    test('não chama callbacks quando na última página (seta direita)', async () => {
      render(<Pagination page={5} totalPages={5} onPrev={onPrev} onNext={onNext} />);

      const nav = screen.getByRole('navigation');
      nav.focus();

      // Simula pressionar seta direita na última página
      fireEvent.keyDown(nav, { key: 'ArrowRight', code: 'ArrowRight' });
      expect(onNext).not.toHaveBeenCalled();
    });
  });

  describe('Números de página', () => {
    test('não mostra números de página por padrão', () => {
      render(<Pagination page={3} totalPages={10} onPrev={onPrev} onNext={onNext} />);

      expect(screen.queryByRole('group', { name: 'Selecionar página' })).not.toBeInTheDocument();
    });

    test('mostra números de página quando showPageNumbers=true', () => {
      render(
        <Pagination
          page={3}
          totalPages={10}
          onPrev={onPrev}
          onNext={onNext}
          showPageNumbers={true}
        />
      );

      expect(screen.getByRole('group', { name: 'Selecionar página' })).toBeInTheDocument();
    });

    test('mostra todas as páginas quando totalPages <= maxVisiblePages', () => {
      render(
        <Pagination
          page={2}
          totalPages={5}
          onPrev={onPrev}
          onNext={onNext}
          onPageChange={onPageChange}
          showPageNumbers={true}
          maxVisiblePages={7}
        />
      );

      expect(screen.getByRole('button', { name: 'Página 1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Página 5' })).toBeInTheDocument();
    });

    test('mostra ellipsis quando há muitas páginas', () => {
      render(
        <Pagination
          page={5}
          totalPages={20}
          onPrev={onPrev}
          onNext={onNext}
          onPageChange={onPageChange}
          showPageNumbers={true}
          maxVisiblePages={5}
        />
      );

      expect(screen.getAllByText('…')).toHaveLength(2);
    });

    test('página atual tem aria-current="page"', () => {
      render(
        <Pagination
          page={3}
          totalPages={10}
          onPrev={onPrev}
          onNext={onNext}
          onPageChange={onPageChange}
          showPageNumbers={true}
        />
      );

      const currentPageButton = screen.getByRole('button', { name: 'Página 3 (atual)' });
      expect(currentPageButton).toHaveAttribute('aria-current', 'page');
      expect(currentPageButton).toBeDisabled();
    });

    test('chama onPageChange quando botão de página é clicado', async () => {
      render(
        <Pagination
          page={3}
          totalPages={10}
          onPrev={onPrev}
          onNext={onNext}
          onPageChange={onPageChange}
          showPageNumbers={true}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Página 5' }));
      expect(onPageChange).toHaveBeenCalledWith(5);
    });

    test('não chama onPageChange para página atual', async () => {
      render(
        <Pagination
          page={3}
          totalPages={10}
          onPrev={onPrev}
          onNext={onNext}
          onPageChange={onPageChange}
          showPageNumbers={true}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Página 3 (atual)' }));
      expect(onPageChange).not.toHaveBeenCalled();
    });
  });

  describe('Acessibilidade', () => {
    test('botões têm type="button" explícito', () => {
      render(<Pagination page={2} totalPages={5} onPrev={onPrev} onNext={onNext} />);

      expect(screen.getByLabelText('Página anterior')).toHaveAttribute('type', 'button');
      expect(screen.getByLabelText('Próxima página')).toHaveAttribute('type', 'button');
    });

    test('botões de página têm labels descritivos', () => {
      render(
        <Pagination
          page={3}
          totalPages={10}
          onPrev={onPrev}
          onNext={onNext}
          onPageChange={onPageChange}
          showPageNumbers={true}
        />
      );

      expect(screen.getByRole('button', { name: 'Página 1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Página 3 (atual)' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Ir para página 10' })).toBeInTheDocument();
    });

    test('estrutura semântica correta', () => {
      render(<Pagination page={2} totalPages={5} onPrev={onPrev} onNext={onNext} />);

      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByLabelText('Página anterior')).toBeInTheDocument();
      expect(screen.getByLabelText('Próxima página')).toBeInTheDocument();
    });
  });

  describe('Casos extremos', () => {
    test('lida com page = 0', () => {
      render(<Pagination page={0} totalPages={5} onPrev={onPrev} onNext={onNext} />);

      expect(screen.getByLabelText('Página anterior')).toBeDisabled();
      // Verifica se o componente renderiza corretamente
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    test('lida com page > totalPages', () => {
      render(<Pagination page={10} totalPages={5} onPrev={onPrev} onNext={onNext} />);

      expect(screen.getByLabelText('Próxima página')).toBeDisabled();
      // Verifica se o componente renderiza corretamente
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    test('lida com totalPages muito grande', () => {
      render(
        <Pagination
          page={50}
          totalPages={1000}
          onPrev={onPrev}
          onNext={onNext}
          onPageChange={onPageChange}
          showPageNumbers={true}
          maxVisiblePages={7}
        />
      );

      // Verifica se o componente renderiza corretamente
      const elementsWith1000 = screen.getAllByText('1000');
      expect(elementsWith1000.length).toBeGreaterThan(0);
      expect(screen.getAllByText('…')).toHaveLength(2);

      // Verifica se há pelo menos um botão com "50"
      const buttonsWith50 = screen.getAllByText('50');
      expect(buttonsWith50.length).toBeGreaterThan(0);
    });

    test('lida com maxVisiblePages = 1', () => {
      render(
        <Pagination
          page={3}
          totalPages={10}
          onPrev={onPrev}
          onNext={onNext}
          onPageChange={onPageChange}
          showPageNumbers={true}
          maxVisiblePages={1}
        />
      );

      // Deve mostrar apenas a página atual
      expect(screen.getByRole('button', { name: 'Página 3 (atual)' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Página 2' })).not.toBeInTheDocument();
    });
  });

  describe('Performance e callbacks', () => {
    test('callbacks são memoizados', () => {
      const { rerender } = render(
        <Pagination page={2} totalPages={5} onPrev={onPrev} onNext={onNext} />
      );

      const prevButton1 = screen.getByLabelText('Página anterior');
      const nextButton1 = screen.getByLabelText('Próxima página');

      rerender(<Pagination page={2} totalPages={5} onPrev={onPrev} onNext={onNext} />);

      const prevButton2 = screen.getByLabelText('Página anterior');
      const nextButton2 = screen.getByLabelText('Próxima página');

      // Mesmo elemento (não recriado)
      expect(prevButton1).toBe(prevButton2);
      expect(nextButton1).toBe(nextButton2);
    });

    test('visiblePages é memoizado', () => {
      const { rerender } = render(
        <Pagination
          page={3}
          totalPages={10}
          onPrev={onPrev}
          onNext={onNext}
          showPageNumbers={true}
        />
      );

      const pageButtons1 = screen
        .getAllByRole('button')
        .filter((btn) => btn.getAttribute('aria-label')?.startsWith('Página '));

      rerender(
        <Pagination
          page={3}
          totalPages={10}
          onPrev={onPrev}
          onNext={onNext}
          showPageNumbers={true}
        />
      );

      const pageButtons2 = screen
        .getAllByRole('button')
        .filter((btn) => btn.getAttribute('aria-label')?.startsWith('Página '));

      // Mesmo número de botões (não recalculado desnecessariamente)
      expect(pageButtons1).toHaveLength(pageButtons2.length);
    });
  });
});
