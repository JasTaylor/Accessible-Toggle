/**
 * Collapses an article summary list behind an accessible "Show more" button.
 * Without JavaScript, the full list stays visible (progressive enhancement).
 *
 * Markup: <section data-summary-toggle><ul>...</ul></section>
 */
export function initSummaryToggle(root, visibleCount = 1) {
  const list = root.querySelector('ul');
  const items = [...list.children];

  // Nothing to collapse, so leave the server-rendered markup alone.
  if (items.length <= visibleCount) return;

  list.id ||= `summary-${crypto.randomUUID()}`;

  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-controls', list.id);

  let expanded = false;

  const render = () => {
    // `hidden` removes items from the accessibility tree, not just the layout.
    items.forEach((item, i) => (item.hidden = !expanded && i >= visibleCount));
    button.setAttribute('aria-expanded', expanded);
    button.textContent = expanded ? 'Show less' : `Show ${items.length - visibleCount} more`;
  };

  button.addEventListener('click', () => {
    expanded = !expanded;
    render();
  });

  root.append(button);
  render();
}
