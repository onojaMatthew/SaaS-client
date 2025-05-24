
export const authUser = () => {
  if (typeof window !== 'undefined') {
    const token = JSON.parse(localStorage.getItem("token")!);
    if (token) {
      return token;
    }
  }
}

export function cn(...inputs: (string | undefined | false | null)[]): string {
  return inputs.filter(Boolean).join(' ')
}
