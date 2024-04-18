import React, { useCallback } from "react";

export default function Conditions({
  showIncompleteOnly,
  sortOption,
  handleToggleIncompleteOnly,
  handleSortOptionChange
}) {
  const handleToggleIncompleteOnlyMemoized = useCallback(() => {
    handleToggleIncompleteOnly();
  }, [handleToggleIncompleteOnly]);

  const handleSortOptionChangeMemoized = useCallback(
    (e) => {
      handleSortOptionChange(e);
    },
    [handleSortOptionChange]
  );

  return (
    <div className="conditions">
      <label className="uncomplited">
        Только невыполненные:
        <input
          type="checkbox"
          checked={showIncompleteOnly}
          onChange={handleToggleIncompleteOnlyMemoized}
        />
      </label>
      <label className="sorted">
        Sort By:
        <select value={sortOption} onChange={handleSortOptionChangeMemoized}>
          <option value="newest">Сначала новые</option>
          <option value="oldest">Сначала старые</option>
          <option value="alphabetical">В алфавитном порядке</option>
        </select>
      </label>
    </div>
  );
}
