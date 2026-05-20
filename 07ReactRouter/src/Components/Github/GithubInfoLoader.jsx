import React from 'react'

export const GithubInfoLoader = async () => {

  const response = await fetch("https://api.github.com/users/hiteshchoudhary");
  return response.json();
}

export default GithubInfoLoader
