const icon = path => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${path}"/></svg>`;
export const icons = {
  phone: icon('M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2-2-5Z'),
  mail: icon('M3 5h18v14H3V5Zm0 1 9 7 9-7'),
  pin: icon('M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'),
  building: icon('M4 21V3h12v18M16 9h4v12M2 21h20M8 7h4M8 11h4M8 15h4'),
  arrow: icon('M5 12h14m-6-6 6 6-6 6'),
  download: icon('M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5'),
};
