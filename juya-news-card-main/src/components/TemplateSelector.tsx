import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  Search,
  Style,
  Star,
  StarBorder,
} from '@mui/icons-material';
import { THEME_CATEGORIES } from '../templates/catalog';
import type { TemplateSummary } from '../templates/client-registry';

const DRAWER_WIDTH = 340;

interface CategoryGroup {
  id: string;
  name: string;
  icon: string;
  templates: TemplateSummary[];
}

interface TemplateSelectorProps {
  currentTemplate: string;
  onTemplateChange: (id: string) => void;
  hasData: boolean;
  templates: Record<string, TemplateSummary>;
}

const buildCategories = (templates: Record<string, TemplateSummary>): CategoryGroup[] => {
  return THEME_CATEGORIES.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: cat.icon,
    templates: cat.themeIds
      .map(id => templates[id])
      .filter(Boolean) as TemplateSummary[],
  }));
};

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  currentTemplate,
  onTemplateChange,
  hasData,
  templates,
}) => {
  const categories = buildCategories(templates);

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    categories.forEach(cat => {
      if (cat.id === 'minimal-line' || cat.id === 'curated') {
        initial[cat.id] = true;
      }
    });
    return initial;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('card-favorites');
      return saved ? new Set<string>(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const toggleFavorite = (templateId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(templateId)) next.delete(templateId);
      else next.add(templateId);
      try { localStorage.setItem('card-favorites', JSON.stringify(Array.from(next))); } catch {}
      return next;
    });
  };

  const filteredCategories = categories.map(cat => {
    const filteredTemplates = cat.templates.filter(t =>
      !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, templates: filteredTemplates };
  });

  const allFavorites = categories.flatMap(cat =>
    cat.templates.filter(t => favorites.has(t.id))
  );

  return (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        bgcolor: '#FFFFFF',
        borderRight: '1px solid #E8E6E1',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2.5, pb: 2, borderBottom: '1px solid #E8E6E1' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            width: 32,
            height: 32,
            borderRadius: 2,
            bgcolor: '#2D2A26',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Style sx={{ color: '#FFFFFF', fontSize: 18 }} />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#2D2A26', letterSpacing: '0.02em' }}>
            主题风格
          </Typography>
        </Box>
      </Box>

      {/* Search */}
      <Box sx={{ px: 2.5, py: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="搜索主题..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ fontSize: 18, color: '#9E9A94' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiInputBase-root': {
              bgcolor: '#FAFAF8',
              borderRadius: 1.5,
              border: '1px solid #E8E6E1',
              fontSize: '0.85rem',
            },
          }}
        />
      </Box>

      {/* Favorites Toggle */}
      {allFavorites.length > 0 && (
        <Box sx={{ px: 2.5, pb: 1 }}>
          <ListItemButton
            onClick={() => setShowFavorites(!showFavorites)}
            sx={{
              borderRadius: 1.5,
              py: 1,
              bgcolor: showFavorites ? '#F0EEEA' : 'transparent',
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Star sx={{ fontSize: 18, color: '#C4A882' }} />
            </ListItemIcon>
            <ListItemText
              primary="收藏夹"
              primaryTypographyProps={{ sx: { fontWeight: 500, fontSize: '0.95rem', color: '#2D2A26' } }}
              secondary={`${allFavorites.length} 个主题`}
              secondaryTypographyProps={{ sx: { fontSize: '0.75rem', color: '#9E9A94' } }}
            />
            {showFavorites ? <ExpandLess sx={{ fontSize: 20, color: '#9E9A94' }} /> : <ExpandMore sx={{ fontSize: 20, color: '#9E9A94' }} />}
          </ListItemButton>
        </Box>
      )}

      {/* Template List */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 2.5, pb: 2.5 }}>
        <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {showFavorites && allFavorites.length > 0 && (
            <Box sx={{ mb: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#C4A882', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem', px: 1.5, display: 'block', mb: 0.5 }}>
                收藏夹
              </Typography>
              {allFavorites.map(template => (
                <ListItemButton
                  key={template.id}
                  onClick={() => onTemplateChange(template.id)}
                  selected={currentTemplate === template.id}
                  sx={{
                    borderRadius: 1.5,
                    py: 1.25,
                    bgcolor: currentTemplate === template.id ? '#F5F4F0' : 'transparent',
                    '&:hover': { bgcolor: '#FAFAF8' },
                  }}
                >
                  <ListItemText
                    primary={template.name}
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: currentTemplate === template.id ? 600 : 400,
                        fontSize: '1.05rem',
                        color: currentTemplate === template.id ? '#2D2A26' : '#6B6660',
                      }
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={(e) => toggleFavorite(template.id, e)}
                    sx={{ ml: 1, width: 28, height: 28 }}
                  >
                    <Star sx={{ fontSize: 16, color: '#C4A882' }} />
                  </IconButton>
                </ListItemButton>
              ))}
              <Divider sx={{ my: 1 }} />
            </Box>
          )}

          {filteredCategories.filter(cat => cat.templates.length > 0).map((cat, catIndex) => (
            <Box key={cat.id} sx={catIndex > 0 || showFavorites ? { mt: 1.5 } : undefined}>
              <ListItemButton
                onClick={() => toggleCategory(cat.id)}
                sx={{
                  borderRadius: 1.5,
                  py: 1,
                  bgcolor: expandedCategories[cat.id] ? '#FAFAF8' : 'transparent',
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Chip
                    label={cat.templates.length}
                    size="small"
                    sx={{ height: 22, fontSize: '0.7rem', bgcolor: '#E8E6E1', fontWeight: 500, color: '#6B6660' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={cat.name}
                  primaryTypographyProps={{ sx: { fontWeight: 600, fontSize: '0.95rem', color: '#2D2A26' } }}
                />
                {expandedCategories[cat.id] ? <ExpandLess sx={{ fontSize: 20, color: '#9E9A94' }} /> : <ExpandMore sx={{ fontSize: 20, color: '#9E9A94' }} />}
              </ListItemButton>

              <Collapse in={expandedCategories[cat.id]} timeout="auto" unmountOnExit>
                <List disablePadding sx={{ pl: 2, display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                  {cat.templates.map(template => (
                    <ListItemButton
                      key={template.id}
                      onClick={() => onTemplateChange(template.id)}
                      selected={currentTemplate === template.id}
                      sx={{
                        borderRadius: 1.5,
                        py: 1.25,
                        bgcolor: currentTemplate === template.id ? '#F0EEEA' : 'transparent',
                        '&:hover': { bgcolor: '#FAFAF8' },
                      }}
                    >
                      <ListItemText
                        primary={template.name}
                        primaryTypographyProps={{
                          sx: {
                            fontWeight: currentTemplate === template.id ? 600 : 400,
                            fontSize: '1.05rem',
                            color: currentTemplate === template.id ? '#2D2A26' : '#6B6660',
                          }
                        }}
                        secondary={template.description}
                        secondaryTypographyProps={{ sx: { fontSize: '0.75rem', color: '#9E9A94', mt: 0.25 } }}
                      />
                      <IconButton
                        size="small"
                        onClick={(e) => toggleFavorite(template.id, e)}
                        sx={{ ml: 1, width: 28, height: 28 }}
                      >
                        {favorites.has(template.id) ? (
                          <Star sx={{ fontSize: 16, color: '#C4A882' }} />
                        ) : (
                          <StarBorder sx={{ fontSize: 16, color: '#C4C0BB' }} />
                        )}
                      </IconButton>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default TemplateSelector;
