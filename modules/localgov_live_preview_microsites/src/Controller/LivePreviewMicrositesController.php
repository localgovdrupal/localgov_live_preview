<?php

namespace Drupal\localgov_live_preview_microsites\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\node\NodeInterface;
use Drupal\localgov_microsites_group\Entity\MicrositeGroupInterface;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Controller for handling microsite live preview redirections.
 *
 * This controller provides methods to redirect users to the appropriate group
 * edit form when accessing nodes within a microsite context.
 */
class LivePreviewMicrositesController extends ControllerBase {

  /**
   * Redirects to the group edit form when accessing a node in a microsite.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node being accessed.
   *
   * @return \Symfony\Component\HttpFoundation\RedirectResponse
   *   A redirect response to the group edit form or node page.
   */
  public function redirectToGroupEdit(NodeInterface $node) {
    $group = localgov_microsites_group_get_by_context();
    if ($group instanceof MicrositeGroupInterface) {
      $group_id = $group->id();
      $url = Url::fromRoute('entity.group.edit_form', ['group' => $group_id], [
        'query' => [
          'destination' => '/node/' . $node->id(),
        ],
      ])->toString();

      return new RedirectResponse($url);
    }
    else {
      // Handle the case where the group ID is not found.
      $this->messenger()->addError($this->t('Group not found for this node.'));
      return new RedirectResponse('/node/' . $node->id());
    }
  }

}
