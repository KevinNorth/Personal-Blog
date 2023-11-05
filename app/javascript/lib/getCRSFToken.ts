function getCRSFToken(): string | null {
  return (
    document.querySelector('meta[name=csrf-token]')?.getAttribute('content') ||
    null
  );
}

export default getCRSFToken;
