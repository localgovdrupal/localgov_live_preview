<?php

namespace Drupal\Tests\localgov_live_preview_microsites\Functional;

use Drupal\domain\DomainInterface;
use Drupal\Tests\BrowserTestBase;
use Drupal\Tests\localgov_microsites_group\Traits\GroupCreationTrait;
use Drupal\Tests\localgov_microsites_group\Traits\InitializeGroupsTrait;
use Drupal\Tests\localgov_microsites_group\Functional\LoginOutTrait;
use Drupal\Tests\node\Traits\NodeCreationTrait;
use Drupal\localgov_microsites_group\DomainFromGroupTrait;
use Symfony\Component\HttpFoundation\Response;

/**
 * Functional tests for localgov_live_preview_microsites.
 */
class MicrositesLivePreviewTest extends BrowserTestBase {

  use InitializeGroupsTrait;
  use LoginOutTrait;
  use NodeCreationTrait;
  use GroupCreationTrait, DomainFromGroupTrait {
    GroupCreationTrait::getEntityTypeManager insteadof DomainFromGroupTrait;
  }

  /**
   * Disabled schema checking for now.
   *
   * @var bool
   *
   * @see \Drupal\Core\Config\Development\ConfigSchemaChecker
   * phpcs:disable DrupalPractice.Objects.StrictSchemaDisabled.StrictConfigSchema
   */
  protected $strictConfigSchema = FALSE;

  /**
   * {@inheritdoc}
   */
  protected $profile = 'localgov_microsites';

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'localgov_microsites_base';

  /**
   * {@inheritdoc}
   */
  protected static $modules = [
    'localgov_live_preview_microsites',
  ];

  /**
   * Domain 1.
   *
   * @var \Drupal\domain\DomainInterface
   */
  protected $domain1;

  /**
   * User administrator of group 1.
   *
   * @var \Drupal\user\UserInterface
   */
  protected $adminUser1;

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();

    $this->createMicrositeGroups([], 1);
    // The following line causes an error:
    // - ConfigValueException: The hostname (web) is already registered.
    $this->createMicrositeGroupsDomains($this->groups);
    $this->domain1 = $this->getDomainFromGroup($this->groups[1]);
    $this->adminUser1 = $this->createUser();
    $this->adminUser1->addRole('microsites_trusted_editor');
    $this->adminUser1->save();
    $this->groups[1]->addMember($this->adminUser1, ['group_roles' => 'microsite-admin']);

  }

  /**
   * Test localgov_live_preview_microsites installs ok in localgov_microsites.
   */
  public function testLocalGovMicrositesInstall() : void {

    // Test front page loads after site install.
    $this->drupalGet('<front>');
    $this->assertSession()->statusCodeEquals(Response::HTTP_OK);
  }

  /**
   * Test content access to the live preview tab.
   */
  public function testLivePreviewAccess() : void {

    $group1 = $this->groups[1];
    $group1_domain = $this->getDomainFromGroup($group1);
    assert($group1_domain instanceof DomainInterface);

    $this->micrositeDomainLogin($group1_domain, $this->adminUser1);
    $this->drupalGet('<front>');
    $this->assertSession()->statusCodeEquals(200);

  }

}
