"use client";

function useClipBoard() {
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const paste = async () => {
    try {
      return await navigator.clipboard.readText();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return { copy, paste };
}

export default useClipBoard;
