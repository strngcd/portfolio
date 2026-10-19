import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../src/App';
import { ThemeProvider } from '../src/theme/ThemeProvider';

export function renderApp(path = '/') {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

export function renderWithRouter(ui, { path = '/', route = '*' } = {}) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={route} element={ui} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  );
}
