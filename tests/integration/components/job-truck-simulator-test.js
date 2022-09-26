import { module, test } from 'qunit';
import { setupRenderingTest } from 'xbe-simulator/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | job-truck-simulator', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<JobTruckSimulator />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <JobTruckSimulator>
        template block text
      </JobTruckSimulator>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
