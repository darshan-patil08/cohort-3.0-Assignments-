
const CATEGORIES = [
  'All',
  'Ceramics',
  'Textiles',
  'Apothecary',
  'Kitchenware',
  'Lighting',
  'Stationery',
];

const CategoryPills = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        overflowX: 'auto',
        paddingBottom: '8px',
        scrollbarWidth: 'none',
      }}
    >
      {CATEGORIES.map((cat) => {
        const isSelected =
          (cat === 'All' && (!selectedCategory || selectedCategory === 'all')) ||
          selectedCategory?.toLowerCase() === cat.toLowerCase();

        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat === 'All' ? '' : cat)}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              border: '2px solid',
              borderColor: isSelected ? 'var(--color-hero)' : 'var(--color-hairline)',
              backgroundColor: isSelected ? 'var(--color-hero)' : 'var(--color-panel)',
              color: isSelected ? '#FFFFFF' : 'var(--color-heading)',
              transition: 'all var(--transition-fast)',
              whiteSpace: 'nowrap',
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryPills;
