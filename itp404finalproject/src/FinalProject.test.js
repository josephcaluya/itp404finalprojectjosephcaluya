import { render, fireEvent, getByTestId } from "@testing-library/react";
global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
);


test("Adding an Entry by clicking on the submit button on the entry form", () => {
    const mockNewEntry = { 
        user:"Test User", 
        attraction: "Test Attraction",
        title: "Test Entry", 
        description: "This is a test entry.",
        photo: "https://photo.com" 
    };

    const { getByTestId } = render(
        <button
            type="submit"
            data-testid="submit-entry"
            className="btn btn-primary mb-5"
            onClick={() => {
                fetch(`http://localhost:4000/entries`, {
                    method: "POST",
                    body: JSON.stringify(mockNewEntry),
                    headers: {
                        "Content-type": "application/json",
                    },
                })
            }}
        >
            Submit Entry
        </button>
    );

    fireEvent.click(getByTestId("submit-entry"));

    expect(fetch).toHaveBeenCalledWith(
        "http://localhost:4000/entries",
        expect.objectContaining({
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(mockNewEntry),
        })
    );

});

test("Updating an Entry by clicking on the submit button on the entry form", () => {
    const mockUpdatedEntry = {  
        description: "This is a revised description."
    };

    const entryId = 1;

    const { getByTestId } = render(
        <button
            type="submit"
            data-testid="submit-entry"
            className="btn btn-primary mb-5"
            onClick={() => {
                fetch(`http://localhost:4000/entries/${entryId}`, {
                    method: "PATCH",
                    body: JSON.stringify(mockUpdatedEntry),
                    headers: {
                        "Content-type": "application/json",
                    },
                })
            }}
        >
            Submit Entry
        </button>
    );

    fireEvent.click(getByTestId("submit-entry"));

    expect(fetch).toHaveBeenCalledWith(
        "http://localhost:4000/entries/1",
        expect.objectContaining({
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(mockUpdatedEntry),
        })
    );
});


test("Deleting an Entry by Clicking the Delete Button", () => {
    const mockConfirm = jest.spyOn(window, "confirm").mockReturnValue(true);
    const {getByTestId} = render(
        <button 
            className="btn btn-danger mx-3"
            data-testid={"delete-entry-button-1"}
            onClick={() => {
              const deleteMessage = window.confirm('Are you sure you want to delete this entry?');
              if(deleteMessage) {
                fetch(`http://localhost:4000/entries/1`, {
                  method: "DELETE",
                })
              }
            }}>
              Delete Entry
        </button>
    );

    fireEvent.click(getByTestId('delete-entry-button-1'));

    expect(fetch).toHaveBeenCalledWith(
        "http://localhost:4000/entries/1", {
        method: "DELETE", 
    });

    mockConfirm.mockRestore();
});

test("Adding a favorite by clicking on the add to favorites button", () => {
    const mockEntryId = 101;
    const mockUserId = 1;

    const { getByTestId } = render(
        <button
            className="btn btn-warning mx-3"
            data-testid={"add-favorite"}
            onClick={async () => {
                await fetch("http://localhost:4000/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    entryId: mockEntryId,
                    userId: mockUserId,
                    favoritedAt: new Date().toISOString(),
                }),
                })
            }}
        >
        Add to Favorites
        </button>
    );
    fireEvent.click(getByTestId("add-favorite"));

    expect(fetch).toHaveBeenCalledWith(
        "http://localhost:4000/favorites",
        expect.objectContaining({
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                entryId: mockEntryId,
                userId: mockUserId,
                favoritedAt: new Date().toISOString(),
            }),
        })
    );
});

test("Deleting a favorite by Clicking on the Delete Favorite Button", () => {
  const mockConfirm = jest.spyOn(window, "confirm").mockReturnValue(true);
  const mockFavorites = [{ id: 1, entryId: 101 }, { id: 2, entryId: 102 }];
  const mockEntry = { id: 101 };

  const { getByTestId } = render(
    <button
      className="btn btn-danger mx-5"
      data-testid={"remove-favorite"}
      onClick={() => {
        const deleteMessage = window.confirm(
          "Are you sure you want to remove this from favorites?"
        );
        if (deleteMessage) {
          const favoriteToRemove = mockFavorites.find(
            (fav) => fav.entryId === mockEntry.id
          );
          fetch(`http://localhost:4000/favorites/${favoriteToRemove.id}`, {
            method: "DELETE",
          })
        }
      }}
    >
      Remove Favorite
    </button>
  );

  fireEvent.click(getByTestId("remove-favorite"));

  expect(fetch).toHaveBeenCalledWith(
    "http://localhost:4000/favorites/1",
    expect.objectContaining({
      method: "DELETE",
    })
  );

  mockConfirm.mockRestore();

});

test("Adding a disliked place by clicking on the add to dislikes button", () => {
    const mockEntryId = 101;
    const mockUserId = 1;

    const { getByTestId } = render(
        <button
            className="btn btn-warning mx-3"
            data-testid={"add-dislike"}
            onClick={async () => {
                await fetch("http://localhost:4000/dislikes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    entryId: mockEntryId,
                    userId: mockUserId
                }),
                })
            }}
        >
        Add to Dislikes
        </button>
    );

    fireEvent.click(getByTestId("add-dislike"));

    expect(fetch).toHaveBeenCalledWith(
        "http://localhost:4000/dislikes",
        expect.objectContaining({
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                entryId: mockEntryId,
                userId: mockUserId
            }),
        })
    );
});

test("Removing a disliked place by clicking on the delete disliked place button", () => {
    const mockConfirm = jest.spyOn(window, "confirm").mockReturnValue(true);
    const mockDislikes = [{ id: 1, entryId: 201 }, { id: 2, entryId: 202 }];
    const mockEntry = { id: 201 };

    const { getByTestId } = render(
        <button
          className="btn btn-danger mx-5"
          data-testid={"remove-dislike"}
          onClick={() => {
            const deleteMessage = window.confirm(
              "Are you sure you want to remove this from dislikes?"
            );
            if (deleteMessage) {
              const dislikeToRemove = mockDislikes.find(
                (dis) => dis.entryId === mockEntry.id
              );
              fetch(`http://localhost:4000/dislikes/${dislikeToRemove.id}`, {
                method: "DELETE",
              })
            }
          }}
        >
          Remove Disliked Place
        </button>
    );

    fireEvent.click(getByTestId("remove-dislike"));

    expect(fetch).toHaveBeenCalledWith(
        "http://localhost:4000/dislikes/1",
        expect.objectContaining({
        method: "DELETE",
        })
    );

    mockConfirm.mockRestore();
});


