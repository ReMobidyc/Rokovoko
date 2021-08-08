import React from "react";
/**
 * This component read the localStorage to know if the current user have token
 * @returns a page which contains all current user tokens
 */
export default function UserTokens() {
  const userTokens =
    localStorage.getItem("token") === null
      ? []
      : JSON.parse(localStorage.getItem("token"));
  /**
   * Allows us to display token information
   * @param {array} userToken
   * @param {number} index
   * @returns a row with token information
   */
  const displayToken = (userToken, index) => {
    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{userToken.id}</td>
        <td>{userToken.token}</td>
      </tr>
    );
  };
  /**
   *Allows us to display all token in a table.
   * @returns a row which contains all token information for each token present
   *          in userTokens.
   */
  const DisplayTokens = () => {
    return userTokens.map((userToken, index) => {
      return displayToken(userToken, index);
    });
  };

  if (userTokens.length === 0) {
    return <h1> You don&apos;t have any token yet </h1>;
  } else {
    return (
      <div className="table-responsive-md">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Simulation id</th>
              <th scope="col">Token</th>
            </tr>
          </thead>
          <tbody>
            <DisplayTokens />
          </tbody>
        </table>
      </div>
    );
  }
}
