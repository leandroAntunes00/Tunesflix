import React from 'react';
import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import CardList from './CardList';

test('CardList mostra skeletons quando loading', () => {
  render(<CardList loading={true} />);
  // espera encontrar alguns elementos com a classe de skeleton
  const skeletons = document.querySelectorAll('.tf-skeleton');
  expect(skeletons.length).toBeGreaterThan(0);
});
