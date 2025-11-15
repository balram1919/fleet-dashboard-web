export function handleApiError(err) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Something went wrong. Try again.";
  
    return {
      status: err?.response?.status || 500,
      message,
    };
  }
  