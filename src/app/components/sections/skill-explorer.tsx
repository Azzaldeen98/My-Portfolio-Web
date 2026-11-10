'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { createElement, useState } from 'react';
import type { LocalizedSkill } from '@/app/core/domain/types';
import { getPortfolioIcon } from './portfolio-icon';

interface SkillExplorerProps {
  skills: LocalizedSkill[];
  categoriesLabel: string;
  proficiencyLabel: string;
  emptyLabel: string;
  uncategorizedLabel: string;
  categoryLabels: Readonly<Record<string, string>>;
}

export function SkillExplorer({
  skills,
  categoriesLabel,
  proficiencyLabel,
  emptyLabel,
  uncategorizedLabel,
  categoryLabels,
}: SkillExplorerProps) {
  const categories = [...new Set(skills.map((skill) => skill.categoryId))];
  const categoryNames = new Map<string, string>();
  for (const skill of skills) {
    if (skill.categoryId !== null && skill.categoryName !== null) {
      categoryNames.set(skill.categoryId, skill.categoryName);
    }
  }
  const [activeCategory, setActiveCategory] = useState<string | null>(categories[0] ?? null);
  const currentSkills = skills.filter(
    (skill) => skill.categoryId === activeCategory,
  );
  const categoryIcon = getPortfolioIcon(currentSkills[0]?.icon_name ?? null);

  if (skills.length === 0) {
    return <p className="skill-empty-state">{emptyLabel}</p>;
  }

  return (
    <div className="skill-explorer">
      <div className="skill-tabs" role="group" aria-label={categoriesLabel}>
        {categories.map((category) => (
          <button
            key={category ?? 'uncategorized'}
            className={`skill-tab${activeCategory === category ? ' is-active' : ''}`}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category === null
              ? uncategorizedLabel
              : categoryLabels[(categoryNames.get(category) ?? '').toLowerCase()] ??
                categoryNames.get(category) ??
                uncategorizedLabel}
          </button>
        ))}
      </div>

      <div className="skill-panel" aria-live="polite">
        <div className="skill-panel-icon">
          {createElement(categoryIcon, { 'aria-hidden': true, size: 21 })}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            className="skill-list skill-list-progress"
            key={activeCategory ?? 'uncategorized'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {currentSkills.map((skill, index) => {
              const Icon = getPortfolioIcon(skill.icon_name);
              const proficiency = Math.min(100, Math.max(0, skill.proficiency));
              return (
                <motion.li
                  className="skill-item skill-item-progress"
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.24, delay: index * 0.045 }}
                >
                  <span className="skill-item-heading">
                    <Icon aria-hidden="true" size={15} />
                    <span>{skill.name}</span>
                    <span className="skill-proficiency-value">{proficiency}%</span>
                  </span>
                  <span
                    className="skill-proficiency-track"
                    role="progressbar"
                    aria-label={`${skill.name} ${proficiency}%`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={proficiency}
                  >
                    <span className="skill-proficiency-bar" style={{ width: `${proficiency}%` }} />
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </div>
      <span className="skill-proficiency-caption">{proficiencyLabel}</span>
    </div>
  );
}
