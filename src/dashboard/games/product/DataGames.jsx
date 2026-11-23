import { useState, useContext } from 'react';
import { useDeleteGameMutation, useGetGamesQuery } from '../../tools/api/games';
import EditGamesForm from './EditGamesForm';
import { LangContext } from '../../../context/LangContext';
import { notify } from '../../../hooks/useNotify';

const DataGames = ({ games, refetch }) => {
  const { lang } = useContext(LangContext);
  const [editingGame, setEditingGame] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteGame, { isLoading: isDeleting }] = useDeleteGameMutation();

  const handleDelete = (id) => notify.deleteItem(() => deleteGame(id).unwrap(), refetch);

  const gamesWithDiscount = games.map((game) => {
    const discountPercentage = game.discountIndicator
      ? Math.round(((game.originalPrice - game.discountedPrice) / game.originalPrice) * 100)
      : 0;

    return {
      ...game,
      discountPercentage,
    };
  });

  return (
    <div className="dashboard-container">
      {/* Edit Modal */}
      {showEditModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal show" style={{ display: 'block' }}>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header bg-purple text-white">
                    <h5 className="modal-title">{lang === 'AZ' ? 'Oyunu Düzəlt' : 'Edit Game'}</h5>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      onClick={() => setShowEditModal(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    {editingGame && (
                      <EditGamesForm
                        game={editingGame}
                        onClose={() => {
                          setEditingGame(null);
                          setShowEditModal(false);
                        }}
                        refetch={refetch}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Games Grid */}
      <div className="dashboard-grid">
        {gamesWithDiscount.map((game) => {
          const imageUrl = game.imageUrl?.[0]
            ? `http://localhost:3333/${game.imageUrl[0].replace(/\\/g, '/')}`
            : null;

          return (
            <div key={game._id} className="dashboard-card">
              <div className="dashboard-image-container">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={game.gameName}
                    className="dashboard-image"
                    onError={(e) => {
                      e.target.src = 'https://www.mountainmotorvehicles.co.uk/wp-content/uploads/2024/05/No-image-available-2.jpg';
                    }}
                  />
                ) : (
                  <div className="dashboard-image-placeholder">
                    {lang === 'AZ' ? 'Şəkil Mövcud deyil' : 'No Image Available'}
                  </div>
                )}
              </div>

              <div className="dashboard-content">
                <h3 className="dashboard-heading">{game.gameName}</h3>

                <div className="dashboard-description">
                  <div className="description-item d-flex">
                    <span className="description-label pe-2">{lang === 'AZ' ? 'Kateqoriya:' : 'Category:'}</span>
                    <p style={{ fontWeight: '900' }}>{game.gameCategory?.category || 'N/A'}</p>
                  </div>
                </div>

                <div className="dashboard-meta flex-column">
                  <div className="meta-item">
                    <span className="meta-label">{lang === 'AZ' ? 'Əsas Qiymət:' : 'Original Price:'}</span>
                    <span className="meta-value">${game.originalPrice?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">{lang === 'AZ' ? 'Endirimli Qiymət:' : 'Discounted Price:'}</span>
                    <span className="meta-value">${game.discountedPrice?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">{lang === 'AZ' ? 'Endirim:' : 'Discount:'}</span>
                    <span className="meta-value">{game.discountPercentage}%</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">{lang === 'AZ' ? 'Reytinq:' : 'Rating:'}</span>
                    <span className="meta-value">{game.rating} / 5</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">{lang === 'AZ' ? 'Slot:' : 'Slot:'}</span>
                    <span className="meta-value">{game.slot}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">{lang === 'AZ' ? 'Müddət:' : 'Duration:'}</span>
                    <span className="meta-value">{game.duration} days</span>
                  </div>
                </div>

                <div className="dashboard-locations">
                  <span className="locations-label">{lang === 'AZ' ? 'Mövcud olduğu yerlər:' : 'Available in:'}</span>
                  <div className="locations-list py-4">
                    {game.location?.map((location, index) => (
                      <div key={index} className="location-item">
                        <img style={{ width: '50px', paddingRight: '10px' }} src={location.flagUrl} alt="Flag" />
                        <span>{location.country}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dashboard-actions">
                  <button
                    type="button"
                    className="btn btn-edit"
                    onClick={() => {
                      setEditingGame(game);
                      setShowEditModal(true);
                    }}
                  >
                    {lang === 'AZ' ? 'Redaktə' : 'Edit'}
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(game._id)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <i className="fas fa-spinner fa-spin me-2"></i>
                    ) : (
                      <i className="fas fa-trash-alt me-2"></i>
                    )}
                    {isDeleting ? (lang === 'AZ' ? 'Silinir...' : 'Deleting...') : (lang === 'AZ' ? 'Sil' : 'Delete')}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataGames;
